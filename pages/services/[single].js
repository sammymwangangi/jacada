import config from "@config/config.json";
import ServiceSingle from "@layouts/ServiceSingle";
import { getSinglePage } from "@lib/contentParser";
import parseMDX from "@lib/utils/mdxParser";
import { sortByDate } from "@lib/utils/sortFunctions";
const { services_folder } = config.settings;

// service single layout
const Article = ({ service, mdxContent, slug, recentServices }) => {
  const { frontmatter, content } = service[0];

  return (
    <ServiceSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      slug={slug}
      recentServices={recentServices}
    />
  );
};

// get service single slug
export const getStaticPaths = () => {
  const allSlug = getSinglePage(`content/${services_folder}`);
  const paths = allSlug.map((item) => ({
    params: {
      single: item.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// get service single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const services = getSinglePage(`content/${services_folder}`);
  const service = services.filter((p) => p.slug == single);
  const mdxContent = await parseMDX(service[0].content);
  const recentServices = sortByDate(services).filter((service) => service.slug !== single);

  return {
    props: {
      service: service,
      mdxContent: mdxContent,
      slug: single,
      recentServices: recentServices,
    },
  };
};

export default Article;
