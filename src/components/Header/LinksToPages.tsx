import { LABELS } from "@/common/constants/Header/LinksLabel"
import Link from "next/link"


export const LinksToPages = () =>{
    return (
        <div className="flex md:flex-row items-center justify-center 2xl:text-[1.4rem] lg:text-[1.4rem] text-[1.2rem] lg:gap-[1rem] gap-[0.5rem] flex-col  ">
        {LABELS.map((el) => (
          <Link href={el.link} key={el.label}>
            {el.label}
          </Link>
        ))}
      </div>
    )
}