import { Subscriber } from "@backend/shared/shared-types";
import dayjs from "dayjs";
import { NewsletterDto } from "../dto/newsletter.dto";

export const getNewWorkouts = ({workouts}:NewsletterDto, {dateNotify, subscriptions}:Subscriber)=> workouts.filter((workout) => subscriptions.some((item)=>item===workout.coachId)&& dayjs(workout.createdDate).isAfter(dateNotify));

