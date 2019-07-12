import { IntegerToBooleanPipe } from './integer-to-boolean.pipe';

describe('IntegerToBooleanPipe', () => {
  it('create an instance', () => {
    const pipe = new IntegerToBooleanPipe();
    expect(pipe).toBeTruthy();
  });
});
