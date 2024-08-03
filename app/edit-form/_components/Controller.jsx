import { GradientBg } from "@/app/_data/GradientBg";
import { Style } from "@/app/_data/Style";
import { themes } from "@/app/_data/Themes";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Controller = ({ selectedTheme, selectedBg, selectStyle }) => {
  const [showMore, setShowMore] = useState(6);
  return (
    <div>
      <h2 className=" my-1">Themes</h2>
      <Select onValueChange={(value) => selectedTheme(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme, i) => (
            <SelectItem key={i} value={theme["color-schema"]}>
              <div className=" flex gap-3 items-center">
                <div className=" flex">
                  <div
                    className=" h-5 w-5 rounded-l-md"
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <div
                    className=" h-5 w-5"
                    style={{ backgroundColor: theme.secondary }}
                  ></div>
                  <div
                    className=" h-5 w-5 rounded-r-md"
                    style={{ backgroundColor: theme.accent }}
                  ></div>
                </div>
                {theme["color-schema"]}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <h2 className=" mt-8 my-1">Background</h2>
      <div className=" grid grid-cols-3 gap-5">
        {GradientBg.map(
          (bg, i) =>
            i < showMore && (
              <div
                className=" w-full h-[70px] rounded-lg hover:border-black hover:border cursor-pointer"
                key={i}
                onClick={() => selectedBg(bg.gradient)}
                style={{ backgroundImage: bg.gradient }}
              ></div>
            )
        )}
      </div>
      <Button
        onClick={() => {
          if (showMore <= 6) {
            setShowMore(20);
          } else {
            setShowMore(6);
          }
        }}
        variant="ghost"
        className=" w-full my-1"
        size="sm"
      >
        {showMore > 6 ? "Show less" : "Show more"}
      </Button>

      <h2 className=" mt-8 my-1">Style</h2>
      <div className=" grid grid-cols-3">
        {Style.map((item, i) => (
          <div
            onClick={() => selectStyle(item.value)}
            className=" w-[100px] h-[100px] bg-green-600 hover:bg-green-700 text-white cursor-pointer rounded-full  flex items-center justify-center"
            key={i}
          >
            <div className="">
              <h2 className="">{item.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Controller;
