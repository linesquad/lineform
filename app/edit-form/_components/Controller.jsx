import { GradientBg } from "@/app/_data/GradientBg";
import { themes } from "@/app/_data/Themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Controller = ({ selectedTheme }) => {
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
        {GradientBg.map((bg, i) => (
          <div
            className=" w-full h-[70px] rounded-lg hover:border-black hover:border cursor-pointer"
            key={i}
            style={{ backgroundImage: bg.gradient }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Controller;
