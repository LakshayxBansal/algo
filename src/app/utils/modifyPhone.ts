export default function modifyPhone (mobile : string) : string {
    const firstSpaceIndex = mobile.indexOf(" ");
      mobile =
        (firstSpaceIndex !== -1 ? mobile.slice(firstSpaceIndex + 1) : "")
          .length === 0
          ? ""
          : mobile.slice(0, firstSpaceIndex) +
            " " +
            mobile.slice(firstSpaceIndex + 1).replaceAll(" ", "");

    return mobile;
}