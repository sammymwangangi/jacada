import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Link from "next/link";

const Service = ({ service, i }) => {
  const { summary_length, services_folder } = config.settings;
  return (
    <div className="overflow-hidden rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,.05)]">
      {service.frontmatter.image && (
        <Link href={`/${services_folder}/${service.slug}`}>
          <ImageFallback
            className="w-full object-cover"
            src={service.frontmatter.image}
            alt={service.frontmatter.title}
            width={570}
            height={335}
          />
        </Link>
      )}
      <div className="p-8">
        <h2 className="h4">
          <Link
            href={`/${services_folder}/${service.slug}`}
            className="block hover:text-primary hover:underline"
          >
            {service.frontmatter.title}
          </Link>
        </h2>
        <p className="mt-4">
          {service.content.slice(0, Number(summary_length))}...
        </p>
      </div>
    </div>
  );
};

export default Service;
