import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Banner from "@layouts/components/Banner";
import Cta from "@layouts/components/Cta";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { gsap } from "@lib/gsap";
import Service from "@partials/Service";
import { useEffect, useRef } from "react";
const { services_folder } = config.settings;

// service pagination
const ServicePagination = ({
  serviceIndex,
  services,
  currentPage,
  pagination,
}) => {
  const indexOfLastService = currentPage * pagination;
  const indexOfFirstService = indexOfLastService - pagination;
  const totalPages = Math.ceil(services.length / pagination);
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);
  const { frontmatter } = serviceIndex;
  const { title } = frontmatter;
  const servicesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(servicesRef.current, {
        opacity: 1,
        duration: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Base title={title}>
      <section className="section pt-0">
        <Banner title={title} />
        <div className="container">
          <div
            className="row justify-center pt-20 pb-16 opacity-0"
            ref={servicesRef}
          >
            {currentServices.map((service, i) => (
              <div key={`key-${i}`} className="mb-8 lg:col-5">
                <Service service={service} />
              </div>
            ))}
          </div>
          <Pagination
            section={services_folder}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
      {/* CTA */}
      <Cta />
    </Base>
  );
};

export default ServicePagination;

// get blog pagination slug
export const getStaticPaths = () => {
  const getAllSlug = getSinglePage(`content/${services_folder}`);
  const allSlug = getAllSlug.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

// get service pagination content
export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settings;
  const services = getSinglePage(`content/${services_folder}`);
  const serviceIndex = await getListPage(`content/${services_folder}/_index.md`);

  return {
    props: {
      pagination: pagination,
      services: services,
      currentPage: currentPage,
      serviceIndex: serviceIndex,
    },
  };
};
