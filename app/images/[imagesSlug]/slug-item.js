import Image from "next/image";

export default function SlugItem({ image }) {
  console.log(image.title);
  return (
    <>
      <p>the car is</p>
      <p>{image.title}</p>
      <div>
        <Image
          src={image.imageURL}
          alt={image.imageDesc}
          width={500}
          height={300}
          priority
        />
      </div>
      <p>{image.imageDesc}</p>
    </>
  );
}
