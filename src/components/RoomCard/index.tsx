import { Room } from "@/models/room";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type RoomCardProps = {
  room: Room;
};

const RoomCard: FC<RoomCardProps> = ({ room }) => {
  const { coverImage, name, type, price, discount, description, dimension } =
    room;
  return (
    <div className="rounded-xl w-72 mx-auto md:mx-0 overflow-hidden dark:text-black text-white">
      <div className="h-60 overflow-hidden">
        <Image
          src={coverImage.url}
          alt={name}
          width={250}
          height={250}
          className="img scale-animation"
        />
      </div>

      <div className="p-4 dark:bg-white bg-black">
        <div className="flex items-center justify-between text-xl font-semibold">
          <p>{name}</p>
          <p>$ {price}</p>
        </div>
        <p className="pt-2 text-xs">{type}</p>
        <p className="pt-3 pb-6">{description.slice(1, 100)}...</p>
        <Link
          href={`/rooms/${room.slug.current}`}
          className="bg-primary inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500"
        >
          {room.isBooked ? "Booked" : "Book Now"}
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
