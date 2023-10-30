import { Subscriber } from "@backend/shared/shared-types";
import { NewsletterDto } from "../dto/newsletter.dto";
import dayjs from "dayjs";

export const getNewWorkouts = ({workouts}:NewsletterDto, {dateNotify, subscriptions}:Subscriber)=> workouts.filter((workout) => subscriptions.some((item)=>item===workout.coachId)&& dayjs(workout.createdDate).isAfter(dateNotify));

