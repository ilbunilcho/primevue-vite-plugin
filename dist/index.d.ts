declare function importPlugin(_options?: {}): {
    name: string;
    configResolved(config: any): void;
    transform(code: any, id: any): Promise<{
        code: string;
        map: null;
    } | null>;
};
export default importPlugin;
