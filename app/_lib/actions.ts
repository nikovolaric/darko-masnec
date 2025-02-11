"use server";

import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendEnquiry } from "../_config/mail";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import User from "../_models/userModel";
import connectDB from "../_config/database";

/*---------------------------------------------------------------------auth--------------------------------------------------------------------- */

export async function login(formData: FormData) {
  try {
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password)
      throw new Error("Please provide username and password!");

    const user = { username, password };

    const res = await fetch(`${process.env.API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        accept: "aplication/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    }
    const loggedInUser = await res.json();

    const { token } = loggedInUser;

    const cookieStorage = await cookies();

    cookieStorage.set("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  } catch (err) {
    return err;
  }
  redirect("/dashboard");
}

export async function logout() {
  const cookieStorage = await cookies();

  cookieStorage.delete("jwt");

  redirect("/");
}

/*----------------------------------------------------------------------projects---------------------------------------------------------------- */

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function signS3Image(key: string) {
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key.toLowerCase().replaceAll(" ", "-"),
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedUrl } };
}

interface iData {
  title: string;
  year?: string;
  category?: string;
  originalTitle?: string;
  director?: string;
  scriptwriters?: string;
  animation?: string;
  screenplay?: string;
  music?: string;
  sound?: string;
  editing?: string;
  compositing?: string;
  producer?: string;
  duration?: string;
  aspectRatio?: string;
  technique?: string;
  description?: string;
  subtitle?: string;
  link?: string;
  distributionLink?: string;
  mainImage?: string;
  imgs: string[];
}

export async function createProject(formData: FormData, category: string) {
  const cookieStorage = await cookies();
  const session = cookieStorage.get("jwt")?.value as string;
  const { id: userId }: { id: string } = await jwtDecode(session);
  await connectDB();
  const user = await User.findById(userId);
  if (!user || user.role !== "admin") {
    cookieStorage.delete("jwt");
    redirect("/login");
  }

  const auth = "Bearer " + session;

  const data: iData = {
    title: formData.get("title") as string,
    year: formData.get("year") ? (formData.get("year") as string) : undefined,
    category: category,
    originalTitle: formData.get("originalTitle")
      ? (formData.get("originalTitle") as string)
      : undefined,
    director: formData.get("director")
      ? (formData.get("director") as string)
      : undefined,
    scriptwriters: formData.get("scriptwriters")
      ? (formData.get("scriptwriters") as string)
      : undefined,
    animation: formData.get("animation")
      ? (formData.get("animation") as string)
      : undefined,
    screenplay: formData.get("screenplay")
      ? (formData.get("screenplay") as string)
      : undefined,
    music: formData.get("music")
      ? (formData.get("music") as string)
      : undefined,
    sound: formData.get("sound")
      ? (formData.get("sound") as string)
      : undefined,
    editing: formData.get("editing")
      ? (formData.get("editing") as string)
      : undefined,
    compositing: formData.get("compositing")
      ? (formData.get("compositing") as string)
      : undefined,
    producer: formData.get("producer")
      ? (formData.get("producer") as string)
      : undefined,
    duration: formData.get("duration")
      ? (formData.get("duration") as string)
      : undefined,
    aspectRatio: formData.get("aspectRatio")
      ? (formData.get("aspectRatio") as string)
      : undefined,
    technique: formData.get("technique")
      ? (formData.get("technique") as string)
      : undefined,
    description: formData.get("description")
      ? (formData.get("description") as string)
      : undefined,
    subtitle: formData.get("subtitle")
      ? (formData.get("subtitle") as string)
      : undefined,
    link: formData.get("link") ? (formData.get("link") as string) : undefined,
    distributionLink: formData.get("distributionLink")
      ? (formData.get("distributionLink") as string)
      : undefined,
    mainImage: formData.get("mainImage")
      ? (formData.get("mainImage") as string).toLowerCase().replaceAll(" ", "-")
      : undefined,
    imgs: formData.get("imgs")
      ? (formData.getAll("imgs") as string[]).map((img) =>
          img.toLowerCase().replaceAll(" ", "-"),
        )
      : [],
  };

  const res = await fetch(`${process.env.API_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: auth,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  revalidatePath("/projects");
  if (category === "animated film") {
    revalidatePath("/dashboard/animatedfilms");
    redirect("/dashboard/animatedfilms");
  }
  if (category === "interactive/videogame") {
    revalidatePath("/dashboard/interactive-videogames");
    redirect("/dashboard/interactive-videogames");
  }
  if (category === "installations/video") {
    revalidatePath("/dashboard/installation-video");
    redirect("/dashboard/installation-video");
  }
  if (category === "painting") {
    revalidatePath("/dashboard/paintings");
    redirect("/dashboard/paintings");
  }
}

export async function signS3ImageToDelete(key: string) {
  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3, deleteObjectCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedUrl } };
}

export async function deleteProject(formData: FormData, id: string) {
  const cookieStorage = await cookies();
  const session = cookieStorage.get("jwt")?.value as string;
  const { id: userId }: { id: string } = await jwtDecode(session);
  await connectDB();
  const user = await User.findById(userId);
  if (!user || user.role !== "admin") {
    cookieStorage.delete("jwt");
    redirect("/login");
  }

  const auth = "Bearer " + session;

  const res = await fetch(`${process.env.API_URL}/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      authorization: auth,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete project");
  }

  const { project } = await res.json();

  revalidatePath("/projects");
  if (project.category === "animated film") {
    revalidatePath("/dashboard/animatedfilms");
  }
  if (project.category === "interactive/videogame") {
    revalidatePath("/dashboard/interactive-videogames");
  }
  if (project.category === "installations/video") {
    revalidatePath("/dashboard/installation-video");
  }
  if (project.category === "painting") {
    revalidatePath("/dashboard/paintings");
  }
}

export async function temporaryDeleteImage(id: string) {
  const cookieStorage = await cookies();
  const session = cookieStorage.get("jwt")?.value as string;
  const { id: userId }: { id: string } = await jwtDecode(session);
  await connectDB();
  const user = await User.findById(userId);
  if (!user || user.role !== "admin") {
    cookieStorage.delete("jwt");
    redirect("/login");
  }

  const auth = "Bearer " + session;

  const res = await fetch(`${process.env.API_URL}/api/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: auth,
    },
    body: JSON.stringify({ mainImage: "none" }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete project");
  }
}

export async function editProject(
  formData: FormData,
  category: string,
  id: string,
) {
  const cookieStorage = await cookies();
  const session = cookieStorage.get("jwt")?.value as string;
  const { id: userId }: { id: string } = await jwtDecode(session);
  await connectDB();
  const user = await User.findById(userId);
  if (!user || user.role !== "admin") {
    cookieStorage.delete("jwt");
    redirect("/login");
  }

  const auth = "Bearer " + session;

  const data: iData = {
    title: formData.get("title") as string,
    year: formData.get("year") ? (formData.get("year") as string) : undefined,
    originalTitle: formData.get("originalTitle")
      ? (formData.get("originalTitle") as string)
      : undefined,
    director: formData.get("director")
      ? (formData.get("director") as string)
      : undefined,
    scriptwriters: formData.get("scriptwriters")
      ? (formData.get("scriptwriters") as string)
      : undefined,
    animation: formData.get("animation")
      ? (formData.get("animation") as string)
      : undefined,
    screenplay: formData.get("screenplay")
      ? (formData.get("screenplay") as string)
      : undefined,
    music: formData.get("music")
      ? (formData.get("music") as string)
      : undefined,
    sound: formData.get("sound")
      ? (formData.get("sound") as string)
      : undefined,
    editing: formData.get("editing")
      ? (formData.get("editing") as string)
      : undefined,
    compositing: formData.get("compositing")
      ? (formData.get("compositing") as string)
      : undefined,
    producer: formData.get("producer")
      ? (formData.get("producer") as string)
      : undefined,
    duration: formData.get("duration")
      ? (formData.get("duration") as string)
      : undefined,
    aspectRatio: formData.get("aspectRatio")
      ? (formData.get("aspectRatio") as string)
      : undefined,
    technique: formData.get("technique")
      ? (formData.get("technique") as string)
      : undefined,
    description: formData.get("description")
      ? (formData.get("description") as string)
      : undefined,
    subtitle: formData.get("subtitle")
      ? (formData.get("subtitle") as string)
      : undefined,
    link: formData.get("link") ? (formData.get("link") as string) : undefined,
    distributionLink: formData.get("distributionLink")
      ? (formData.get("distributionLink") as string)
      : undefined,
    mainImage: formData.get("mainImage")
      ? (formData.get("mainImage") as string).toLowerCase().replaceAll(" ", "-")
      : undefined,
    imgs: formData.get("imgs")
      ? (formData.getAll("imgs") as string[]).map((img) =>
          img.toLowerCase().replaceAll(" ", "-"),
        )
      : [],
  };

  const res = await fetch(`${process.env.API_URL}/api/projects/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: auth,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to edit project");
  }

  revalidatePath("/projects");
  if (category === "animated film") {
    revalidatePath("/dashboard/animatedfilms");
    redirect("/dashboard/animatedfilms");
  }
  if (category === "interactive/videogame") {
    revalidatePath("/dashboard/interactive-videogames");
    redirect("/dashboard/interactive-videogames");
  }
  if (category === "installations/video") {
    revalidatePath("/dashboard/installation-video");
    redirect("/dashboard/installation-video");
  }
  if (category === "painting") {
    revalidatePath("/dashboard/paintings");
    redirect("/dashboard/paintings");
  }
}

/*----------------------------------------------------------------------awards------------------------------------------------------------------ */

export async function addAward(formData: FormData) {
  const cookieStorage = await cookies();
  const session = cookieStorage.get("jwt")?.value as string;
  const { id: userId }: { id: string } = await jwtDecode(session);
  await connectDB();
  const user = await User.findById(userId);
  if (!user || user.role !== "admin") {
    cookieStorage.delete("jwt");
    redirect("/login");
  }

  const auth = "Bearer " + session;

  const data = Object.fromEntries(formData);

  const res = await fetch(`${process.env.API_URL}/api/awards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: auth,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create");
  }

  revalidatePath("/dashboard/awards");
  revalidatePath("/awards-festivals");
  redirect("/dashboard/awards");
}

export async function editAward(formData: FormData, id: string) {
  const cookieStorage = await cookies();
  const session = cookieStorage.get("jwt")?.value as string;
  const { id: userId }: { id: string } = await jwtDecode(session);
  await connectDB();
  const user = await User.findById(userId);
  if (!user || user.role !== "admin") {
    cookieStorage.delete("jwt");
    redirect("/login");
  }

  const auth = "Bearer " + session;

  const data = Object.fromEntries(formData);

  const res = await fetch(`${process.env.API_URL}/api/awards/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: auth,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create");
  }

  revalidatePath("/dashboard/awards");
  revalidatePath(`/dashboard/awards/${id}`);
  revalidatePath("/awards-festivals");
  redirect("/dashboard/awards");
}

export async function deleteAward(formData: FormData, id: string) {
  const cookieStorage = await cookies();
  const session = cookieStorage.get("jwt")?.value as string;
  const { id: userId }: { id: string } = await jwtDecode(session);
  await connectDB();
  const user = await User.findById(userId);
  if (!user || user.role !== "admin") {
    cookieStorage.delete("jwt");
    redirect("/login");
  }

  const auth = "Bearer " + session;

  const res = await fetch(`${process.env.API_URL}/api/awards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: auth,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete");
  }

  revalidatePath("/dashboard/awards");
  revalidatePath("/awards-festivals");
}

/*------------------------------------------------------------------exhibitions----------------------------------------------------------------*/

export async function deleteExhibition(formData: FormData, id: string) {
  const cookieStorage = await cookies();
  const session = cookieStorage.get("jwt")?.value as string;
  const { id: userId }: { id: string } = await jwtDecode(session);
  await connectDB();
  const user = await User.findById(userId);
  if (!user || user.role !== "admin") {
    cookieStorage.delete("jwt");
    redirect("/login");
  }

  const auth = "Bearer " + session;

  const res = await fetch(`${process.env.API_URL}/api/exhibitions/${id}`, {
    method: "DELETE",
    headers: {
      authorization: auth,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete");
  }

  revalidatePath("/dashboard/awards");
  revalidatePath("/exhibitions");
}

export async function addExhibition(formData: FormData) {
  const cookieStorage = await cookies();
  const session = cookieStorage.get("jwt")?.value as string;
  const { id: userId }: { id: string } = await jwtDecode(session);
  await connectDB();
  const user = await User.findById(userId);
  if (!user || user.role !== "admin") {
    cookieStorage.delete("jwt");
    redirect("/login");
  }

  const auth = "Bearer " + session;

  const data = Object.fromEntries(formData);

  const res = await fetch(`${process.env.API_URL}/api/exhibitions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: auth,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create");
  }

  revalidatePath("/dashboard/exhibitions");
  revalidatePath("/exhibitions");
  redirect("/dashboard/exhibitions");
}

export async function editExhibition(formData: FormData, id: string) {
  const cookieStorage = await cookies();
  const session = cookieStorage.get("jwt")?.value as string;
  const { id: userId }: { id: string } = await jwtDecode(session);
  await connectDB();
  const user = await User.findById(userId);
  if (!user || user.role !== "admin") {
    cookieStorage.delete("jwt");
    redirect("/login");
  }

  const auth = "Bearer " + session;

  const data = Object.fromEntries(formData);

  const res = await fetch(`${process.env.API_URL}/api/exhibitions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      authorization: auth,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to edit");
  }

  revalidatePath("/dashboard/exhibitions");
  revalidatePath(`/dashboard/exhibitions/${id}`);
  revalidatePath("/exhibitions");
  redirect("/dashboard/exhibitions");
}

/*-----------------------------------------------------------------------maili-------------------------------------------------------------------*/

export async function sendMail(formData: FormData) {
  if (formData.has("honeypot")) return "error";

  const data = {
    name: formData.get("name") as string,
    mail: formData.get("mail") as string,
    message: formData.get("message") as string,
  };

  const result = await sendEnquiry(data);

  return result;
}

/*--------------------------------------------------------------------------banner-------------------------------------------------------------- */

export async function createBanner(formData: FormData) {
  try {
    const cookieStorage = await cookies();
    const session = cookieStorage.get("jwt")?.value as string;
    const { id: userId }: { id: string } = await jwtDecode(session);
    await connectDB();
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      cookieStorage.delete("jwt");
      redirect("/login");
    }

    const auth = "Bearer " + session;

    const data = {
      title: formData.get("title")
        ? (formData.get("title") as string)
        : undefined,
      image: (formData.get("image") as string)
        .toLowerCase()
        .replaceAll(" ", "-"),
    };

    const res = await fetch(`${process.env.API_URL}/api/banner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: auth,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error);
    }

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
  redirect("/dashboard");
}

export async function editBanner(formData: FormData, id: string) {
  try {
    const cookieStorage = await cookies();
    const session = cookieStorage.get("jwt")?.value as string;
    const { id: userId }: { id: string } = await jwtDecode(session);
    await connectDB();
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      cookieStorage.delete("jwt");
      redirect("/login");
    }

    const auth = "Bearer " + session;

    const data = {
      title: formData.get("title")
        ? (formData.get("title") as string)
        : undefined,
      image: formData.get("image")
        ? (formData.get("image") as string).toLowerCase().replaceAll(" ", "-")
        : undefined,
    };

    const res = await fetch(`${process.env.API_URL}/api/banner/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: auth,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error);
    }

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
  redirect("/dashboard");
}

export async function temporaryDeleteBanner(id: string) {
  try {
    const cookieStorage = await cookies();
    const session = cookieStorage.get("jwt")?.value as string;
    const { id: userId }: { id: string } = await jwtDecode(session);
    await connectDB();
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      cookieStorage.delete("jwt");
      redirect("/login");
    }

    const auth = "Bearer " + session;

    const res = await fetch(`${process.env.API_URL}/api/banner/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: auth,
      },
      body: JSON.stringify({ image: "none" }),
    });

    if (!res.ok) {
      throw new Error("Failed to delete banner");
    }
  } catch (error) {
    return (error as Error).message;
  }
}

/*---------------------------------------------------------------------work in progress-------------------------------------------------------- */

export async function createWorkInProgress(formData: FormData) {
  try {
    const cookieStorage = await cookies();
    const session = cookieStorage.get("jwt")?.value as string;
    const { id: userId }: { id: string } = await jwtDecode(session);
    await connectDB();
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      cookieStorage.delete("jwt");
      redirect("/login");
    }

    const auth = "Bearer " + session;

    const data = {
      description: formData.get("description"),
      imgs: (formData.getAll("imgs") as string[]).map((img) =>
        img.toLowerCase().replaceAll(" ", "-"),
      ),
    };

    const res = await fetch(`${process.env.API_URL}/api/inprogress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: auth,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error);
    }

    revalidatePath("/dashboard/inprogress");
    revalidatePath("/inprogress");
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
  redirect("/dashboard/inprogress");
}

export async function editWorkInProgress(formData: FormData, id: string) {
  try {
    const cookieStorage = await cookies();
    const session = cookieStorage.get("jwt")?.value as string;
    const { id: userId }: { id: string } = await jwtDecode(session);
    await connectDB();
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      cookieStorage.delete("jwt");
      redirect("/login");
    }

    const auth = "Bearer " + session;

    const data = {
      description: formData.get("description"),
      imgs: formData.getAll("imgs")
        ? (formData.getAll("imgs") as string[]).map((img) =>
            img.toLowerCase().replaceAll(" ", "-"),
          )
        : undefined,
    };

    const res = await fetch(`${process.env.API_URL}/api/inprogress/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: auth,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error);
    }

    revalidatePath("/dashboard/inprogress");
    revalidatePath("/inprogress");
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
  redirect("/dashboard/inprogress");
}

export async function deleteWorkInProgress(formData: FormData, id: string) {
  try {
    const cookieStorage = await cookies();
    const session = cookieStorage.get("jwt")?.value as string;
    const { id: userId }: { id: string } = await jwtDecode(session);
    await connectDB();
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      cookieStorage.delete("jwt");
      redirect("/login");
    }

    const auth = "Bearer " + session;

    const res = await fetch(`${process.env.API_URL}/api/inprogress/${id}`, {
      method: "DELETE",
      headers: {
        authorization: auth,
      },
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error);
    }

    revalidatePath("/dashboard/inprogress");
    revalidatePath("/inprogress");
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
}
