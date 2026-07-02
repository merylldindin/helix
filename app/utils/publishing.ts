import type { PageComponent, RoutePath } from "@/types";
import { ROUTES_CONTENT } from "@/utils/routes";

const PST_TIME_ZONE = "America/Los_Angeles";

export const getCurrentDateInPst = (): string => {
  return new Date().toLocaleDateString("en-CA", { timeZone: PST_TIME_ZONE });
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const getLinkedRoute = (component: PageComponent): string | undefined => {
  const content = component.props?.content;

  if (!Array.isArray(content)) {
    return undefined;
  }

  const moreItem = content.find(
    (item): item is Record<string, unknown> => {
      return isRecord(item) && item.type === "more";
    },
  );

  if (!moreItem || !isRecord(moreItem.prop)) {
    return undefined;
  }

  return typeof moreItem.prop.to === "string" ? moreItem.prop.to : undefined;
};

const getDatePublished = (route: string): string | undefined => {
  return ROUTES_CONTENT[route as RoutePath]?.schema?.prop?.datePublished;
};

export const filterReleasedComponents = (
  components: PageComponent[],
  currentDate: string,
): PageComponent[] => {
  return components.filter((component) => {
    const linkedRoute = getLinkedRoute(component);

    if (!linkedRoute) {
      return true;
    }

    const datePublished = getDatePublished(linkedRoute);

    return datePublished === undefined || datePublished <= currentDate;
  });
};
