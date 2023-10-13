import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Cta from "./components/Cta";
import ImageFallback from "./components/ImageFallback";
import Service from "./partials/Service";

const ServiceSingle = ({ frontmatter, content, mdxContent, recentServices }) => {
  let { description, title, image } = frontmatter;
  description = description ? description : content.slice(0, 120);

  return (
    <Base title={title} description={description}>
      <section className="section pt-0">
        <div className="container">
          <article>
            <div className="row justify-center">
              <div className="lg:col-10">
                {image && (
                  <Image
                    src={image}
                    height="700"
                    width="1120"
                    alt={title}
                    priority={true}
                    className="fade w-full rounded-lg opacity-0"
                  />
                )}
              </div>
              <div className="lg:col-8">
                {markdownify(title, "h1", "h2 mt-6")}
                
                <div className="content mt-16 mb-16 text-left">
                  <MDXRemote {...mdxContent} components={shortcodes} />
                </div>
              </div>
            </div>
          </article>

          <div className="section mt-16">
            <h2 className="section-title text-center">Other Services</h2>
            <div className="row justify-center">
              {recentServices.slice(0, 2).map((service, index) => (
                <div key={"service-" + index} className="animate mt-16 lg:col-5">
                  <Service service={service} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </Base>
  );
};

export default ServiceSingle;
