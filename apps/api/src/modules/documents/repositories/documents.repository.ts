import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Document, DocumentEntity } from '../schemas/document.schema';

import {
  CreateDocumentData,
  PublishedDocumentsAggregateResult,
  PublishedDocumentsResult,
} from './../types/documents.types';
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
  async find(filter: Record<string, unknown> = {}): Promise<DocumentEntity[]> {
    const queryFilter = { ...filter };

    // If a string-based workspaceId is provided, safely cast it to a native ObjectId
    if (
      queryFilter.workspaceId &&
      typeof queryFilter.workspaceId === 'string'
    ) {
      try {
        queryFilter.workspaceId = new Types.ObjectId(queryFilter.workspaceId);
      } catch {
        return []; // Return early if the string format is broken
      }
    }

    const res = await this.documentModel
      .find(queryFilter)
      .sort({ createdAt: -1 })
      .exec();

    return res;
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

  async findPublishedDocuments(options: {
    page: number;
    limit: number;
    search?: string;
    category?: string;
    sort?: 'newest' | 'oldest' | 'updated';
  }): Promise<PublishedDocumentsResult> {
    const { page, limit, search, category, sort = 'newest' } = options;

    const matchStage: Record<string, unknown> = {
      status: DocumentStatus.PUBLISHED,
    };

    if (category?.trim()) {
      matchStage.category = category;
    }

    if (search?.trim()) {
      matchStage.$or = [
        {
          title: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          'seo.title': {
            $regex: search,
            $options: 'i',
          },
        },
        {
          'seo.description': {
            $regex: search,
            $options: 'i',
          },
        },
      ];
    }

    const sortStage: Record<string, 1 | -1> = {
      publishedAt: -1,
    };

    if (sort === 'oldest') {
      sortStage.publishedAt = 1;
    }

    if (sort === 'updated') {
      delete sortStage.publishedAt;
      sortStage.updatedAt = -1;
    }

    const skip = (page - 1) * limit;

    const [result] =
      await this.documentModel.aggregate<PublishedDocumentsAggregateResult>([
        {
          $match: matchStage,
        },

        {
          $facet: {
            items: [
              {
                $sort: sortStage,
              },
              {
                $skip: skip,
              },
              {
                $limit: limit,
              },
              {
                $project: {
                  _id: 0, // Exclude the raw original _id object
                  id: { $toString: '$_id' }, // Safely cast ObjectId to a clean string
                  title: { $ifNull: ['$title', ''] },
                  slug: { $ifNull: ['$slug', ''] },
                  excerpt: { $ifNull: ['$excerpt', ''] },
                  category: { $ifNull: ['$category', ''] },
                  publishedAt: { $ifNull: ['$publishedAt', null] },
                  updatedAt: { $ifNull: ['$updatedAt', null] },
                },
              },
            ],

            totalCount: [
              {
                $count: 'count',
              },
            ],
          },
        },
      ]);

    return {
      items: result?.items ?? [],
      total: result?.totalCount?.[0]?.count ?? 0,
    };
  }
}
