import {Dropdown, Input, Modal} from 'client-library';
import {Controller, useForm} from 'react-hook-form';
import {DropdownDataString} from '../../types/dropdownData';
import {DeactivationForm} from './styles';

interface DeactivateModalProps {
  onClose: () => void;
  onDeactivate: (data: DeactivationModalForm) => void;
  id?: number;
}

interface DeactivationModalForm {
  //todo check if string
  reason: DropdownDataString;
  description: string;
}

const DeactivateModal = ({onClose, onDeactivate}: DeactivateModalProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
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
      content={
        <DeactivationForm>
          <Controller
            name="reason"
            control={control}
            rules={{required: 'Ovo polje je obavezno'}}
            render={({field: {name, value, onChange}}) => (
              <Dropdown
                name={name}
                value={value}
                onChange={onChange}
                options={[]}
                label="RAZLOG DEAKTIVACIJE:"
                error={errors.reason?.message}
              />
            )}
          />
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
