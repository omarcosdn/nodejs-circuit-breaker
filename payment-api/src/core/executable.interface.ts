export interface ExecutableUseCase<Input, Output> {
  execute(input: Input): Promise<Output>;
}
