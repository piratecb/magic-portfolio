import {
  Meta,
  Schema,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { HomeContent } from "@/components/home/HomeContent";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}&v=2`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <HomeContent
        featuredProjectSlot={
          <Projects range={[1, 1]} />
        }
        blogPostsSlot={
          routes["/blog"] ? <Posts range={[1, 2]} columns="2" /> : undefined
        }
        extraProjectsSlot={<Projects range={[2]} />}
        showBlog={routes["/blog"]}
      />
    </>
  );
}
