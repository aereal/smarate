import LinearProgress from "@material-ui/core/LinearProgress"
import { mount } from "enzyme"
import React from "react"
import { MockedProvider } from "react-apollo/test-utils"
import { FighterSelectUnit } from "../../components/fighter-select-unit"
import { MyPage } from "../my"

describe("pages/My", () => {
  test("on loading", () => {
    const wrapper = mount(
      <MockedProvider mocks={[]} addTypename={false}>
        <MyPage />
      </MockedProvider>
    )
    expect(
      wrapper
        .find(FighterSelectUnit)
        .first()
        .prop("fighterSelectorProps")
    ).toEqual({ disabled: true })
    expect(wrapper.contains(<LinearProgress />)).toBe(true)
  })
})
