import { Controller, Get, Post, Body, Param, Delete, Patch, Headers, NotFoundException, ForbiddenException } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { CreateTestimonialInviteDto } from './dto/create-testimonial-invite.dto';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  // --- Rutas ESTÁTICAS primero (evitan conflicto con :token y :id) ---

  @Post('invites')
  createInvite(@Body() createInviteDto: CreateTestimonialInviteDto, @Headers('x-admin-key') adminKey: string) {
    if (adminKey !== process.env.ADMIN_API_KEY) {
      throw new ForbiddenException('No tienes permiso para generar invitaciones');
    }
    return this.testimonialsService.createInvite(createInviteDto);
  }

  @Get('invites/:token')
  async validateInvite(@Param('token') token: string) {
    const result = await this.testimonialsService.validateInvite(token);
    if (!result.valid) {
      throw new NotFoundException('Invitación no válida o expirada');
    }
    return result;
  }

  @Get()
  findAll() {
    return this.testimonialsService.findAll();
  }

  // --- Rutas DINÁMICAS después ---

  @Post(':token')
  createWithToken(@Body() createTestimonialDto: CreateTestimonialDto, @Param('token') token: string) {
    return this.testimonialsService.create(createTestimonialDto, token);
  }

  @Post()
  createWithoutToken(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createTestimonialDto);
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.testimonialsService.approve(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testimonialsService.remove(id);
  }
}