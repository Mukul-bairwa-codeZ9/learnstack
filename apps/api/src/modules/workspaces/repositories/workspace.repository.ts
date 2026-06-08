import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Workspace, WorkspaceDocument } from '../schemas/workspace.schema';
import { CreateWorkspaceData } from '../types/workspace.types';

@Injectable()
export class WorkspaceRepository {
  constructor(
    @InjectModel(Workspace.name)
    private readonly workspaceModel: Model<WorkspaceDocument>,
  ) {}

  async create(data: CreateWorkspaceData): Promise<WorkspaceDocument> {
    return this.workspaceModel.create({
      ...data,
      ownerId: new Types.ObjectId(data.ownerId),
    });
  }

  async findById(id: string): Promise<WorkspaceDocument | null> {
    return this.workspaceModel.findById(id).exec();
  }

  async findBySlug(slug: string): Promise<WorkspaceDocument | null> {
    return this.workspaceModel.findOne({ slug }).exec();
  }

  async findByOwner(ownerId: string): Promise<WorkspaceDocument[]> {
    return this.workspaceModel.find({ ownerId :new Types.ObjectId(ownerId)}).sort({ createdAt: -1 }).exec();
  }

  async update(
    id: string,
    data: Partial<Workspace>,
  ): Promise<WorkspaceDocument | null> {
    return this.workspaceModel
      .findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.workspaceModel.findByIdAndDelete(id).exec();
  }
}
