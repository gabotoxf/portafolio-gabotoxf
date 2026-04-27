import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { CreateTestimonialInviteDto } from './dto/create-testimonial-invite.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  // --- Testimonials ---

  async create(createTestimonialDto: CreateTestimonialDto, token?: string) {
    console.log('--- [DEBUG] INICIO CREACIÓN TESTIMONIO ---');
    console.log('1. Datos recibidos:', JSON.stringify(createTestimonialDto, null, 2));
    console.log('2. Token recibido:', token);

    try {
      const dataToSave = {
        name: createTestimonialDto.name,
        message: createTestimonialDto.message,
        company: createTestimonialDto.company || null,
        position: createTestimonialDto.position || null,
        rating: createTestimonialDto.rating || 5,
        image: createTestimonialDto.image || null,
        approved: false,
      };

      if (token) {
        console.log('3. Buscando token:', token);
        const invite = await this.prisma.testimonialInvite.findUnique({
          where: { token },
        });

        if (!invite) {
          console.error('❌ ERROR: Invitación no encontrada para el token:', token);
          throw new BadRequestException('Invitación no encontrada');
        }
        if (invite.used) {
          console.error('❌ ERROR: Invitación ya utilizada:', token);
          throw new BadRequestException('Invitación ya utilizada');
        }

        console.log('4. Insertando testimonio...');
        const testimonial = await this.prisma.testimonial.create({
          data: dataToSave,
        });
        console.log('✅ TESTIMONIO CREADO EXITOSAMENTE. ID:', testimonial.id);

        console.log('5. Marcando invitación como usada...');
        await this.prisma.testimonialInvite.update({
          where: { id: invite.id },
          data: { used: true },
        });
        console.log('✅ INVITACIÓN MARCADA COMO USADA');

        return testimonial;
      }

      console.log('3 (Sin Token). Insertando testimonio directo...');
      const testimonial = await this.prisma.testimonial.create({
        data: dataToSave,
      });
      console.log('✅ TESTIMONIO CREADO EXITOSAMENTE (SIN TOKEN). ID:', testimonial.id);
      return testimonial;

    } catch (error) {
      console.error('❌ ERROR CRÍTICO EN OPERACIÓN DE BD:', error);
      // Loggear más detalles del error si es de Prisma
      if (error.code) console.error('Prisma Error Code:', error.code);
      if (error.meta) console.error('Prisma Error Meta:', JSON.stringify(error.meta));
      throw error;
    }
  }

  async findAll() {
    console.log('🔍 [DEBUG] Buscando testimonios en la base de datos...');
    try {
      const allTestimonials = await this.prisma.testimonial.findMany();
      console.log(`📊 [DEBUG] Total en tabla Testimonial: ${allTestimonials.length}`);
      
      const approvedOnly = allTestimonials.filter(t => t.approved === true);
      console.log(`✅ [DEBUG] Testimonios aprobados encontrados: ${approvedOnly.length}`);
      
      return approvedOnly;
    } catch (error) {
      console.error('❌ [DEBUG] Error al consultar testimonios:', error);
      throw error;
    }
  }

  async approve(id: string) {
    try {
      return await this.prisma.testimonial.update({
        where: { id },
        data: { approved: true },
      });
    } catch (error) {
      throw new NotFoundException(`Testimonio con ID ${id} no encontrado`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.testimonial.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Testimonio con ID ${id} no encontrado`);
    }
  }

  // --- Invites ---

  async createInvite(dto: CreateTestimonialInviteDto) {
    const token = uuidv4();
    const invite = await this.prisma.testimonialInvite.create({
      data: {
        ...dto,
        token,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
      },
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return {
      ...invite,
      inviteLink: `${frontendUrl}/referencias/${token}`,
    };
  }

  async validateInvite(token: string) {
    console.log(`Validating invite token: ${token}`);
    try {
      const invite = await this.prisma.testimonialInvite.findUnique({
        where: { token },
      });

      if (!invite || invite.used || (invite.expiresAt && invite.expiresAt < new Date())) {
        console.log(`Invite invalid: ${token}, invite found: ${!!invite}, used: ${invite?.used}, expired: ${invite?.expiresAt && invite.expiresAt < new Date()}`);
        return { valid: false };
      }

      console.log(`Invite valid for token: ${token}`);
      return { valid: true, invite };
    } catch (error) {
      console.error(`Error validating invite token ${token}:`, error);
      throw error;
    }
  }
}
