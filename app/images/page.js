import ImageGrid from "@/components/imageComp/image-grid";
import { getImages } from "@/pages/api/getImages";
import { Suspense, use } from "react"; // use hook'u eklendi (Next.js 13+ için)
import classes from "./page.module.css";
import SearchInput from "./search-input";

async function ImagesComponent() {
  const images = await getImages();
  return <ImageGrid images={images} />;
}

export default function ImagesPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Perfect images, shared{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Search your favorite images and download for using wallpaper, profile
          picture, etc...
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching images...</p>}
        >
          <div className={classes.mainDiv}>
            <SearchInput />
          </div>
          <div className={classes.listTitle}>
            <h1>Recently Added Images</h1>
            <hr className={classes.hr} />
          </div>
          {/* Next.js 13+ için use hook'u ile çağırma */}
          {use(ImagesComponent())}
        </Suspense>
      </main>
    </>
  );
}
