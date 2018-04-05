import * as React from "react";
import * as renderer from "react-test-renderer";
import { Search } from "./Search";

test("should pass", () => {
  const com = renderer.create(
    <Search countries={[]} totalScore={0} onSearch={() => null} />
  );
  const tree = com.toJSON();
  expect(tree).toMatchSnapshot();
});
