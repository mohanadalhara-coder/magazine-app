'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

function generateSlug(title) {
  let slug = title.trim().toLowerCase().replace(/[^\w\u0621-\u064A\u0660-\u0669-]+/g, '-').replace(/(^-|-$)+/g, '');
  if (!slug) slug = Date.now().toString();
  return slug;
}

export async function createArticle(data) {
  try {
    const slug = generateSlug(data.title);
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        coverImage: data.coverImage || null,
        evidenceUrl: data.evidenceUrl || null,
        published: true, // Auto publish for simplicity
      },
    });

    revalidatePath('/');
    revalidatePath('/admin');
    
    return { success: true, article };
  } catch (error) {
    console.error("Error creating article:", error);
    return { success: false, error: 'Could not create article. Slug might already exist.' };
  }
}

export async function deleteArticle(id) {
  try {
    await prisma.article.delete({
      where: { id }
    });
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Could not delete article.' };
  }
}

export async function createCaricature(data) {
  try {
    const item = await prisma.caricature.create({
      data: {
        title: data.title,
        imageUrl: data.imageUrl,
        published: true, 
      },
    });
    revalidatePath('/caricature');
    revalidatePath('/admin');
    return { success: true, item };
  } catch (error) {
    return { success: false, error: 'Could not create caricature.' };
  }
}

export async function deleteCaricature(id) {
  try {
    await prisma.caricature.delete({ where: { id } });
    revalidatePath('/caricature');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) { return { success: false }; }
}

export async function createVideo(data) {
  try {
    const item = await prisma.video.create({
      data: {
        title: data.title,
        videoUrl: data.videoUrl,
        published: true, 
      },
    });
    revalidatePath('/videos');
    revalidatePath('/admin');
    return { success: true, item };
  } catch (error) {
    return { success: false, error: 'Could not create video.' };
  }
}

export async function deleteVideo(id) {
  try {
    await prisma.video.delete({ where: { id } });
    revalidatePath('/videos');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) { return { success: false }; }
}

export async function updateAboutDescription(value) {
  try {
    await prisma.siteSetting.upsert({
      where: { key: 'about_description' },
      update: { value },
      create: { key: 'about_description', value },
    });
    revalidatePath('/about');
    revalidatePath('/admin/about');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Could not update description.' };
  }
}

export async function createTeamMember(data) {
  try {
    const slug = generateSlug(data.name);
    const item = await prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        bio: data.bio || null,
        imageUrl: data.imageUrl || null,
        slug,
      },
    });
    revalidatePath('/about');
    revalidatePath('/admin/about');
    return { success: true, item };
  } catch (error) {
    console.error("Error creating team member:", error);
    return { success: false, error: 'Could not create team member.' };
  }
}

export async function deleteTeamMember(id) {
  try {
    await prisma.teamMember.delete({ where: { id } });
    revalidatePath('/about');
    revalidatePath('/admin/about');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Could not delete team member.' };
  }
}
