import mount from "@test/mount";

import { Button } from "@components";
import { Main } from "./index";

describe("Main component testing with enzyme", () => {
  const component = mount(<Main />);

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });

  it("renders texts successfuly", () => {
    expect(component.html()).toContain(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    );
  });

  it("renders button successfuly", () => {
    expect(component.find(Button)).toBeDefined();
  });
});
