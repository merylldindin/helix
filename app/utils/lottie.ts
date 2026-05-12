const hexToLottieColor = (hexColor: string): [number, number, number, number] => {
  const normalizedHex = hexColor.replace("#", "");
  const resolvedHex =
    normalizedHex.length === 3
      ? normalizedHex
          .split("")
          .map((character) => `${character}${character}`)
          .join("")
      : normalizedHex;

  return [
    Number.parseInt(resolvedHex.slice(0, 2), 16) / 255,
    Number.parseInt(resolvedHex.slice(2, 4), 16) / 255,
    Number.parseInt(resolvedHex.slice(4, 6), 16) / 255,
    1,
  ];
};

const replaceLottieColors = (
  value: unknown,
  nextColor: [number, number, number, number]
): void => {
  if (!value || typeof value !== "object") {
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      replaceLottieColors(item, nextColor);
    }

    return;
  }

  const objectValue = value as Record<string, unknown>;
  const colorDefinition = objectValue.c;

  if (colorDefinition && typeof colorDefinition === "object") {
    const typedColorDefinition = colorDefinition as Record<string, unknown>;

    if (Array.isArray(typedColorDefinition.k)) {
      typedColorDefinition.k = [...nextColor];
    }
  }

  for (const nestedValue of Object.values(objectValue)) {
    replaceLottieColors(nestedValue, nextColor);
  }
};

export const cloneLottieWithColor = <T>(animationData: T, hexColor: string): T => {
  const animation = JSON.parse(JSON.stringify(animationData)) as T;

  replaceLottieColors(animation, hexToLottieColor(hexColor));

  return animation;
};
