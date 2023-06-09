import { Tag } from '@prisma/client';

import prisma from '@/db/prisma';

interface GetAllArgs {
  name: string;
  page: number;
  limit: number;
  order: string;
}

interface CreateArgs {
  name: string;
}

interface UpdateArgs {
  name: string;
}

class TagModel {
  public getAll({ name, page, limit, order }: GetAllArgs): Promise<Tag[]> {
    const offset = (page - 1) * limit;

    return prisma.tag.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: offset,
      take: limit,
      orderBy: {
        name: order === 'desc' ? 'desc' : 'asc',
      },
    });
  }
  public getTagById(id: string): Promise<Tag | null> {
    return prisma.tag.findFirst({
      where: { id },
    });
  }
  public getTagsById(ids: string[]): Promise<Tag[] | null> {
    return prisma.tag.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  public create(data: CreateArgs): Promise<Tag> {
    return prisma.tag.create({ data });
  }

  public update(id: string, data: UpdateArgs): Promise<Tag> {
    return prisma.tag.update({
      where: { id },
      data,
    });
  }
}

export default new TagModel();
