import Link from "next/link";
import PortfolioImage from "@/components/PortfolioImage";
import { projectCardCover, projectCover, type WorkProject } from "@/lib/work";
export default function WorkCard({
  project,
  featured = false,
}: {
  project: WorkProject;
  featured?: boolean;
}) {
  const cover = projectCover(project);
  const cardCover = projectCardCover(project);
  const thumbnails = project.media
    .filter((m) => m.thumbnail && m.thumbnail !== cover)
    .slice(0, 3);
  return (
    <article className={`work-card ${featured ? "featured-card" : ""}`}>
      <Link
        href={`/work/${project.slug}`}
        className={`work-cover ${project.status === "Roster record" ? "roster-image-cover" : ""}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        {cover ? (
          <PortfolioImage
            src={cardCover!}
            alt=""
            sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 40vw"
            className="cover-image"
            defer={featured}
          />
        ) : (
          <div className="roster-cover">
            <span>{project.name.slice(0, 2).toUpperCase()}</span>
            <small>Historical roster</small>
          </div>
        )}
        <span className="cover-status">{project.status}</span>
      </Link>
      <div className="work-card-body">
        <div className="work-card-top">
          <p className="eyebrow">
            {project.disciplines.join(" / ") || "Roster record"}
          </p>
          <span>
            {project.media.length}{" "}
            {project.media.length === 1 ? "item" : "items"}
          </span>
        </div>
        <h3>
          <Link href={`/work/${project.slug}`}>
            {project.name}
            <span aria-hidden="true">↗</span>
          </Link>
        </h3>
        <p>{project.description}</p>
        {!featured && thumbnails.length > 0 && (
          <div className="supporting-thumbs" aria-label="Supporting work">
            {thumbnails.map((m) => (
              <Link
                key={m.id}
                href={`/work/${project.slug}?media=${m.id}`}
                aria-label={`View ${m.title}`}
              >
                <PortfolioImage src={m.thumbnail!} alt="" sizes="120px" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
