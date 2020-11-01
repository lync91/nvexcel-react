declare var Excel: { 
    run: (arg0: (context: any) => Promise<void>) => any; 
    PaperType: { [x: string]: any; }; 
    PageOrientation: { [x: string]: any; }; 
    SearchDirection: { backwards: any; }; 
 }

export function getPageType(key: any): Excel.PaperType {
    return Excel.PaperType[key]
}
export function getOrientationType(key: any): Excel.PageOrientation {
    return Excel.PageOrientation[key]
}