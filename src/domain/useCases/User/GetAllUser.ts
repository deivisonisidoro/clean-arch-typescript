export interface IGetAllUserUseCase {
  execute(page: number): Promise<object>
}
