import { CreateSendStreamView } from '../components/view';

export const CreateSendStreamContainer = () => {
  /**
   * Function to be called in order to create the stream
   *
   * @param {object} input input params
   */
  const onSubmit = (input) => {
    console.log(input);
  };

  return <CreateSendStreamView onSubmit={onSubmit} />;
};
