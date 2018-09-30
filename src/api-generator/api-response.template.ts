export const apiResponseInterface = `
export class ApiResponse<T> {
    error: boolean;
    errorMessage: string;
    data: T;
    timestamp: number;
}
`;
