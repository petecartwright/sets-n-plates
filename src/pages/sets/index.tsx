import Head from 'next/head'
import { Set } from '@/components/Set'
import { useEffect, useState } from 'react'
import { getPlatesForWeight, getSets } from '@/lib/utils'
import { BAR_WEIGHT_OPTIONS, MAX_ALLOWED_WEIGHT } from '@/common/consts'

// TODO - handle errors in Plates component
// TODO - style error text

interface ISetFormState {
  barWeight: string
  startWeight: string
  workWeight: string
}

interface IValidationResults {
  [key: string]: { isValid: boolean; message: string }[]
}

const DEFAULT_BAR_WEIGHT =
  BAR_WEIGHT_OPTIONS[BAR_WEIGHT_OPTIONS.length - 1].toString()

const INITIAL_VALUES: ISetFormState = {
  barWeight: DEFAULT_BAR_WEIGHT,
  startWeight: DEFAULT_BAR_WEIGHT,
  workWeight: '',
}

// Validation pattern borrowed from Robin Wieruch's blog post:
// https://www.robinwieruch.de/react-form/#react-form-with-validation
const VALIDATION: Record<string, any> = {
  startWeight: [
    {
      isValid: (formState: ISetFormState, value: string) =>
        !isNaN(Number(value)),
      message: 'Start weight must be a number',
    },
    {
      isValid: (formState: ISetFormState, value: string) =>
        Number(value) >= Number(formState.barWeight),
      message: 'Start weight must be greater than or equal to bar weight',
    },
    {
      isValid: (formState: ISetFormState, value: string) =>
        Number(value) <= Number(formState.workWeight),
      message: 'Start weight must be less than or equal to work weight',
    },
    {
      isValid: (formState: ISetFormState, value: string) =>
        Number(value) <= MAX_ALLOWED_WEIGHT,
      message: `Start weight must be less than or equal to ${MAX_ALLOWED_WEIGHT}`,
    },
  ],
  workWeight: [
    {
      isValid: (formState: ISetFormState, value: string) =>
        !isNaN(Number(value)),
      message: 'Work weight must be a number',
    },
    {
      isValid: (formState: ISetFormState, value: string) =>
        Number(value) >= Number(formState.barWeight),
      message: 'Work weight must be greater than or equal to bar weight',
    },
    {
      isValid: (formState: ISetFormState, value: string) =>
        Number(value) >= Number(formState.startWeight),
      message: 'Work weight must be greater than or equal to start weight',
    },
    {
      isValid: (formState: ISetFormState, value: string) =>
        Number(value) <= MAX_ALLOWED_WEIGHT,
      message: `Work weight must be less than or equal to ${MAX_ALLOWED_WEIGHT}`,
    },
    {
      isValid: (formState: ISetFormState, value: string) => {
        // see if we can make plates with this value
        try {
          let targetWeight = Number(value)
          let barWeight = Number(formState.barWeight)
          getPlatesForWeight({ targetWeight, barWeight })
          return true
        } catch (err) {
          return false
        }
      },
      message: 'Unable to get plates for this weight',
    },
  ],
}

function getErrorFields(
  formState: ISetFormState
): [IValidationResults, number] {
  // look at each field, run all defined validation checks
  // return list of errors if any
  const errors: IValidationResults = Object.keys(formState).reduce(
    (acc, key) => {
      // if we don't have validation defined, we're done
      if (!VALIDATION[key]) return acc

      // perform each check for each field and get a list of potential errors
      const errorsPerField = VALIDATION[key]
        .map(
          (validation) => ({
            isValid: validation.isValid(formState, formState[key]),
            message: validation.message,
          }),
          {}
        )
        // remove anything without an error
        .filter((fieldError) => !fieldError.isValid)

      return { ...acc, [key]: errorsPerField }
    },
    {}
  )

  const errorCount = Object.keys(errors).reduce((count, item) => {
    return count + errors[item].length
  }, 0)

  return [errors, errorCount]
}

function isDirty(formState) {
  // return true if any of the fields have changed from initial values
  // false otherwise
  // does not tell you which ones bc I don't care
  const dirtyFields = Object.keys(formState)
    .map((key) => {
      // see what form fields don't have the initial values
      const isDirty = formState[key] !== INITIAL_VALUES[key]
      return isDirty
    })
    .filter((item) => item)
  console.log(dirtyFields)
  return dirtyFields.length > 0
}

export default function SetsPage() {
  const [sets, setSets] = useState<number[]>([])
  const [formState, setFormState] = useState(INITIAL_VALUES)

  const [errorFields, errorCount] = getErrorFields(formState)

  const dirty = isDirty(formState)
  console.log('dirty', dirty)
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormState({
      ...formState,
      [event.target.id]: event.target.value,
    })
  }

  useEffect(() => {
    let start = Number(formState.startWeight)
    let work = Number(formState.workWeight)
    if (start && work) {
      try {
        let sets = getSets({ startWeight: start, workWeight: work })
        setSets(sets)
      } catch (err) {
        setSets([])
      }
    }
  }, [formState.barWeight, formState.startWeight, formState.workWeight])

  return (
    <>
      <Head>
        <title>Sets &apos;n&apos; Plates</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          SETS
          <div>
            <label htmlFor="barWeight">Bar</label>{' '}
            <select
              id="barWeight"
              name="barWeight"
              onChange={handleChange}
              defaultValue="45"
            >
              {BAR_WEIGHT_OPTIONS.map((weightOption) => {
                return (
                  <option key={weightOption} value={weightOption}>
                    {weightOption}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            <label htmlFor="startWeight"> Start Weight</label>{' '}
            <input
              id="startWeight"
              name="startWeight"
              onChange={handleChange}
              value={formState.startWeight}
              type="text"
            />
            {dirty && errorFields.startWeight?.length ? (
              <span>{errorFields.startWeight[0].message} </span>
            ) : null}
          </div>
          <div>
            <label htmlFor="workWeight"> Work Weight</label>{' '}
            <input
              id="workWeight"
              name="workWeight"
              onChange={handleChange}
              value={formState.workWeight}
              type="text"
            />
            {dirty && errorFields.workWeight?.length ? (
              <span>{errorFields.workWeight[0].message} </span>
            ) : null}
          </div>
          <div>
            {errorCount === 0 && sets.length
              ? sets.map((setWeight) => (
                  <Set
                    key={setWeight}
                    targetWeight={setWeight}
                    barWeight={Number(formState.barWeight)}
                  />
                ))
              : null}
          </div>
        </div>
      </main>
    </>
  )
}
