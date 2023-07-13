import {DropdownDataNumber} from '../types/dropdownData';

export const createDropdownOptions = (array: any[], idKey?: string, titleKey?: string): DropdownDataNumber[] => {
  if (array) {
    return array.map((object: any) => ({
      id: object[idKey ?? 'id'] as DropdownDataNumber['id'],
      title: object[titleKey ?? 'title'] as DropdownDataNumber['title'],
    }));
  } else return [];
};
