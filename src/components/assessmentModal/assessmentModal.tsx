import {Datepicker, Dropdown, Input, Modal} from 'client-library';
import {Controller, useForm} from 'react-hook-form';
import {estimationTypeOptions} from '../../constants';
import useAssessmentInsert from '../../services/graphQL/assessmentInsert/useAssessmentInsert';
import useGetSettings from '../../services/graphQL/getSettings/useGetSettings';
import {DropdownDataNumber} from '../../types/dropdownData';
import {MicroserviceProps} from '../../types/micro-service-props';
import {parseDate, parseDateForBackend} from '../../utils/dateUtils';
import {EstimationForm} from './styles';

interface AssessmentModalProps {
  context: MicroserviceProps;
  onClose: () => void;
  id: number;
  refetch?: () => void;
}

interface AssessmentModalForm {
  type: DropdownDataNumber;
  gross_price_difference: string;
  date_of_assessment: Date;
  depreciation_type_id: DropdownDataNumber;
  gross_price_new: string;
}

const AssessmentModal = ({context, onClose, id, refetch}: AssessmentModalProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    control,
  } = useForm<AssessmentModalForm>();

  const {alert} = context;
  const user_profile_id = context.contextMain.user_profile_id || 1;

  const {options: depreciationTypeOptions} = useGetSettings({context: context, entity: 'deprecation_types'});

  const {mutate, loading: isSaving} = useAssessmentInsert({context});

  const onAddEstimation = async (data: AssessmentModalForm) => {
    if (isValid && !isSaving) {
      await mutate(
        {
          depreciation_type_id: data.depreciation_type_id.id,
          gross_price_difference: parseFloat(data.gross_price_difference),
          gross_price_new: parseFloat(data.gross_price_new),
          date_of_assessment: parseDateForBackend(data?.date_of_assessment),
          inventory_id: Number(id),
          // This tells which is the last (active) assessment
          active: true,
          user_profile_id,
        },
        () => {
          alert.success('Procjena uspješno dodana');
          refetch && refetch();
          onClose();
        },
        () => {
          alert.error('Greška prilikom dodavanja procjene');
        },
      );
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      title="DODAJ PROCJENU"
      leftButtonOnClick={onClose}
      rightButtonOnClick={handleSubmit(onAddEstimation)}
      rightButtonText="Dodaj procjenu"
      leftButtonText="Otkaži"
      buttonLoading={isSaving}
      content={
        <EstimationForm>
          <Controller
            name="type"
            rules={{required: 'Ovo polje je obavezno'}}
            control={control}
            render={({field: {name, value, onChange}}) => (
              <Dropdown
                name={name}
                value={value}
                onChange={onChange}
                options={estimationTypeOptions}
                label="TIP PROCJENE:"
                error={errors.type?.message}
              />
            )}
          />
          <Input
            {...register('gross_price_difference', {required: 'Ovo polje je obavezno'})}
            label="VRIJEDNOST PROCJENE:"
            error={errors.gross_price_difference?.message}
            type="number"
          />
          <Controller
            name="date_of_assessment"
            control={control}
            rules={{required: 'Ovo polje je obavezno'}}
            render={({field: {name, value, onChange}}) => (
              <Datepicker
                onChange={onChange}
                label="DATUM PROCJENE:"
                name={name}
                value={value ? parseDate(value) : ''}
                error={errors.date_of_assessment?.message}
              />
            )}
          />
          <Controller
            name="depreciation_type_id"
            control={control}
            rules={{required: 'Ovo polje je obavezno'}}
            render={({field: {name, value, onChange}}) => (
              <Dropdown
                name={name}
                value={value}
                onChange={onChange}
                options={depreciationTypeOptions}
                label="AMORTIZACIONA GRUPA:"
                error={errors.depreciation_type_id?.message}
              />
            )}
          />
          <Input
            {...register('gross_price_new', {required: 'Ovo polje je obavezno'})}
            label="ISPRAVKA VRIJEDNOSTI:"
            error={errors.gross_price_new?.message}
            type="number"
          />
        </EstimationForm>
      }
    />
  );
};

export default AssessmentModal;
