export type Mods = Record<string, string | boolean | undefined>;

export const classNames = (
    cls: string,
    mods: Mods = {},
    aditional: Array<string | undefined> = [],
) => {
    const cn = [cls, ...aditional.filter(Boolean), ...Object.keys(mods).filter((key) => mods[key])];

    return cn.join(' ');
};
