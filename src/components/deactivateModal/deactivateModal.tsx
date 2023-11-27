import {Input, Modal, Datepicker} from 'client-library';
import {Controller, useForm} from 'react-hook-form';
import {DeactivationForm} from './styles';
import {parseDate} from '../../utils/dateUtils';

interface DeactivateModalProps {
  onClose: () => void;
  onDeactivate: (data: DeactivationModalForm) => void;
  id?: number;
  loading?: boolean;
}

interface DeactivationModalForm {
  //todo check if string
  inactive: Date;
  description: string;
}

const DeactivateModal = ({onClose, onDeactivate, loading}: DeactivateModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<DeactivationModalForm>();

  return (
    <Modal
      open={true}
      onClose={onClose}
      title="DEAKTIVACIJA SREDSTVA"
      leftButtonOnClick={onClose}
      rightButtonOnClick={handleSubmit(onDeactivate)}
      rightButtonText="Deaktiviraj"
      leftButtonText="Otkaži"
      buttonLoading={loading}
      content={
        <DeactivationForm>
          <Controller
            name="inactive"
            rules={{required: 'Ovo polje je obavezno'}}
            control={control}
            render={({field: {name, value, onChange}}) => (
              <Datepicker
                name={name}
                selected={value ? new Date(value) : ''}
                onChange={onChange}
                options={[]}
                label="DATUM:"
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
