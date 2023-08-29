export interface IDeleteUserUseCase {
  execute(userId: string): Promise<unknown>
}
