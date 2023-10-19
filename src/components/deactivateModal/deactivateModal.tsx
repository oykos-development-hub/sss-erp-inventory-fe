import {Dropdown, Input, Modal} from 'client-library';
import {Controller, useForm} from 'react-hook-form';
import {DropdownDataString} from '../../types/dropdownData';
import {DeactivationForm} from './styles';

interface DeactivateModalProps {
  onClose: () => void;
  onDeactivate: (data: DeactivationModalForm) => void;
  id?: number;
  loading?: boolean;
}

interface DeactivationModalForm {
  //todo check if string
  description: string;
}

const DeactivateModal = ({onClose, onDeactivate, loading}: DeactivateModalProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<DeactivationModalForm>();

  return (
    <Modal
      open={true}
      onClose={onClose}
      title="INACTIVATE"
      leftButtonOnClick={onClose}
      rightButtonOnClick={handleSubmit(onDeactivate)}
      rightButtonText="Deaktiviraj"
      leftButtonText="Otkaži"
      buttonLoading={loading}
      content={
        <DeactivationForm>
          <Input
            {...register('description', {required: 'Ovo polje je obavezno'})}
            label="OPIS:"
            error={errors.description?.message}
            textarea={true}
          />
        </DeactivationForm>
      }
    />
  );
};

export default DeactivateModal;
