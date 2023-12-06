import {  Req, Controller, Post, UseFilters, UseInterceptors, HttpStatus, UploadedFile, Get, Param, UseGuards, Query, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { AppPath, ControllerName, FileType, WorkoutMessages} from '../app.constant';
import 'multer';
import FormData from 'form-data';
import {  ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import{CoachOrderQuery, WorkoutListQuery} from"@backend/shared-quieries";
import { getSpecialPrice } from '@backend/util/util-core';
import { Workout } from '@backend/shared/shared-types';
import { CreateWorkoutDto } from '@backend/shared/shared-dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags(ControllerName.Workouts)
@Controller(ControllerName.Workouts)
@UseFilters(AxiosExceptionFilter)
export class WorkoutsController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutMessages.ShowOrders,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: WorkoutMessages.EmptyOrders,
  })
  @UseGuards(CheckAuthGuard)
  @Get(`${AppPath.Orders}`)
  public async showUserOrders(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.OrdersList}`,
    {
      headers: {
        Authorization: req.headers['authorization'],
      },
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutMessages.ShowOrders,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: WorkoutMessages.EmptyOrders,
  })
  @UseGuards(CheckAuthGuard)
  @Get(`${AppPath.Orders}/${AppPath.CoachList}`)
  public async showCoachOrders(@Req() req: Request, @Query() query:CoachOrderQuery ) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.OrdersList}/${AppPath.CoachList}`,
    {params:query,
      headers: {
        Authorization: req.headers['authorization'],
      },
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get(`${AppPath.Orders}/${AppPath.CoachList}/${AppPath.Count}`)
  public async countCoachOrders(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.OrdersList}/${AppPath.CoachList}`,
    {
      headers: {
        Authorization: req.headers['authorization'],
      },
    });
    return data.length;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutMessages.ShowAll,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: WorkoutMessages.EmptyList,
  })
  @UseGuards(CheckAuthGuard)
  @Get(AppPath.CoachList)
  public async showWorkoutsCoach(@Req() req: Request, @Query() query:WorkoutListQuery ) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.WorkoutsList}/${AppPath.CoachList}`,
    {params:query,
      headers: {
        Authorization: req.headers['authorization'],
      },
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutMessages.ShowAll,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: WorkoutMessages.EmptyList,
  })
  @UseGuards(CheckAuthGuard)
  @Get(AppPath.Show)
  public async showWorkoutsUser(@Req() req: Request, @Query() query:WorkoutListQuery ) {
    const { data } = await this.httpService.axiosRef.get(ApplicationServiceURL.WorkoutsList,
    {params:query,
      headers: {
        Authorization: req.headers['authorization'],
      },
    });
    return data;
    }

    @UseGuards(CheckAuthGuard)
    @Get(`${AppPath.CoachList}/${AppPath.GetExtra}`)
    public async showExtraWorkoutsCoach(@Req() req: Request ) {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.WorkoutsList}/${AppPath.CoachList}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      });
      const totalWorkouts = data.length;
      const prices = data.map((item:Workout) => item.isSpecialOffer? getSpecialPrice(item.price) : item.price);
      const maxPrice = prices.length ? prices.reduce((prev:number, current:number) => (prev > current) ? prev : current):0;
      return {workouts:data, totalWorkouts, maxPrice};
    }

  @UseGuards(CheckAuthGuard)
  @Get(`${AppPath.Show}/${AppPath.GetExtra}`)
  public async showExtraWorkoutsUser(@Req() req: Request ) {
    const { data } = await this.httpService.axiosRef.get(ApplicationServiceURL.WorkoutsList,
    {
      headers: {
        Authorization: req.headers['authorization'],
      },
    });
    const totalWorkouts = data.length;
    const prices = data.map((item:Workout) => item.isSpecialOffer? getSpecialPrice(item.price) : item.price);
    const maxPrice =prices.length ? prices.reduce((prev:number, current:number) => (prev > current) ? prev : current):0;
    return {workouts:data, totalWorkouts, maxPrice};
    }

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutMessages.ShowReviews,
  })
  @UseGuards(CheckAuthGuard)
  @Get(`${AppPath.Show}-${AppPath.Reviews}/${AppPath.Id}`)
  public async showReviews(
    @Param('id') id: number,@Req() req: Request,
  ) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.ReviewsList}/${id}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      });
          return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutMessages.ShowSingle,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: WorkoutMessages.WorkoutNotFound,
  })
  @UseGuards(CheckAuthGuard)
  @Get(AppPath.Id)
  public async showSingleWorkout(@Req() req: Request, @Param('id') id: number ) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.WorkoutsList}/${id}`,
    {
      headers: {
        Authorization: req.headers['authorization'],
      },
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: WorkoutMessages.AddWorkout,
  })
  @Post(AppPath.Add)
  public async createWorkout(@Body() dto: CreateWorkoutDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.WorkoutInfo}/${AppPath.Add}`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutMessages.AddVideo,
  })
  @UseGuards(CheckAuthGuard)
  @Post(`${AppPath.Id}/${AppPath.Upload}-${FileType.Video}`)
  @UseInterceptors(FileInterceptor(FileType.Video))
  public async updateVideo(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number
  ) {
    const formData = new FormData();
    formData.append(FileType.Video, Buffer.from(file.buffer), {
      filename: file.originalname,
      contentType: file.mimetype,
    });
    const { data: videoData } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Uploader}/${AppPath.Upload}/${FileType.Video}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.WorkoutInfo}/${id}`,
      { video: videoData.id },
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }


}
