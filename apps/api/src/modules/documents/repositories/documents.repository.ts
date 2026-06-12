import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { Document, DocumentEntity } from '../schemas/document.schema';

import { CreateDocumentData } from './../types/documents.types';
import { DocumentStatus } from '../enums/document-status.enum';

@Injectable()
export class DocumentsRepository {
  constructor(
    @InjectModel(Document.name)
    private readonly documentModel: Model<DocumentEntity>,
  ) {}

  async create(data: CreateDocumentData): Promise<DocumentEntity> {
    return this.documentModel.create({
      ...data,
      workspaceId: new Types.ObjectId(data.workspaceId),
      createdBy: new Types.ObjectId(data.createdBy),
    });
  }

  async find(filter = {}): Promise<DocumentEntity[]> {
    return this.documentModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<DocumentEntity | null> {
    return this.documentModel.findById(id).exec();
  }

  async findOne(filter = {}): Promise<DocumentEntity | null> {
    return this.documentModel.findOne(filter).exec();
  }

  async update(
    id: string,
    data: Partial<Document>,
  ): Promise<DocumentEntity | null> {
    return this.documentModel
      .findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.documentModel.findByIdAndDelete(id).exec();
  }

  async exists(filter = {}): Promise<boolean> {
    const result = await this.documentModel.exists(filter);

    return !!result;
  }

  async findBySlug(slug: string): Promise<DocumentEntity | null> {
    return this.documentModel
      .findOne({
        slug,
        status: DocumentStatus.PUBLISHED,
      })
      .exec();
  }

  async publish(id: string, publishedAt: Date): Promise<DocumentEntity | null> {
    return this.update(id, {
      status: DocumentStatus.PUBLISHED,
      publishedAt,
      archivedAt: null,
    });
  }

  async unpublish(id: string): Promise<DocumentEntity | null> {
    return this.update(id, {
      status: DocumentStatus.DRAFT,
    });
  }

  async archive(id: string, archivedAt: Date): Promise<DocumentEntity | null> {
    return this.update(id, {
      status: DocumentStatus.ARCHIVED,
      archivedAt,
    });
  }

  async publishedExists(slug: string): Promise<boolean> {
    const result = await this.documentModel.exists({
      slug,
      status: DocumentStatus.PUBLISHED,
    });

    return !!result;
  }
}
