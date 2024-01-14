"use client";
import CountUpNumber from "../CountUpNumber";
import { ReactNode, FC } from "react";

type clientComponentProps = {
  heading: ReactNode;
  paragraph: ReactNode;
  section2: ReactNode;
};

const ClientComponent: FC<clientComponentProps> = ({
  heading,
  paragraph,
  section2,
}) => {
  return (
    <section className="flex px-4 items-center gap-12 container mx-auto">
      <div className="py-10 h-full">
        <button className="btn-primary mb-4">Get Started</button>
        {heading}
        {paragraph}
        <div className="flex justify-between mt-12">
          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-xl text-center">Basic Room</p>
            <CountUpNumber duration={2000} endValue={20} />
          </div>
          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-xl text-center">Luxuary Room</p>
            <CountUpNumber duration={2000} endValue={20} />
          </div>
          <div className="flex gap-3 flex-col items-center justify-center">
            <p className="text-xs lg:text-xl text-center">Suite Room</p>
            <CountUpNumber duration={2000} endValue={20} />
          </div>
        </div>
      </div>
      {section2}
    </section>
  );
};

export default ClientComponent;
