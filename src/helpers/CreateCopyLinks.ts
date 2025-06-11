
export const createCopyQuickLink = (linkId: string) => {
  return `https://clickcontent.eu/p/${linkId}`;
};

export const createCopyDonateLink = (nickname: string) => {
  return `https://clickcontent.eu/d/${nickname.toLowerCase()}`;
};

export const createCopyTargetLink = (linkId: string, userNickName:string) => {

  return `https://clickcontent.eu/d/${userNickName?.toLowerCase()}/${linkId}`;
};

export const createCreativeLink = (
  linkId: string,
  creativeLink: any,
  linkType: "aim" | "quicklink",
  userNickName:string
) => {
  const copyLink =
    linkType === "quicklink"
      ? createCopyQuickLink(linkId)
      : createCopyTargetLink(linkId, userNickName);

  return `${creativeLink?.description}  \r\n\r\nРеклама. ${creativeLink?.organizationName}. ИНН ${creativeLink?.organizationInn}, erid: ${creativeLink.erid} \r\n\r\n${copyLink}`;
};

export const createCretiveText = (creativeLink: any) => {
  return `Реклама. ${creativeLink?.organizationName}, ИНН{" "}
  ${creativeLink?.organizationInn}, ERID ${creativeLink?.erid}`;
};

export const createMediaLink = (id: string) => {
  return `https://s3.timeweb.cloud/${id}`;
};
