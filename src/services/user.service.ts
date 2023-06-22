import { FilterQuery, SortOrder, UpdateQuery, ProjectionType } from "mongoose";
import User, { IUser } from "../models/user.model";

export const createUser = async (
  data: Partial<IUser>
): Promise<IUser | null> => {
  const user = await User.create(data);
  return user;
};

export const getAllUsers = async (
  query: FilterQuery<IUser> = {},
  select: ProjectionType<IUser> = {},
  sort: { [key: string]: SortOrder } = {},
  limit: number = 0,
  skip: number = 0
): Promise<IUser[] | null> => {
  const users = await User.find(query, select)
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .exec();
  return users;
};

export const getOneUser = async (
  query: FilterQuery<IUser> = {},
  select: ProjectionType<IUser> = {}
): Promise<IUser | null> => {
  const user = await User.findOne(query, select).exec();
  return user;
};

export const updateOneUser = async (
  query: UpdateQuery<IUser> = {},
  data: Partial<IUser> = {}
): Promise<IUser | null> => {
  const updated = await User.findOneAndUpdate(query, data).exec();
  return updated;
};
