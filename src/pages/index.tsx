import Head from 'next/head'
import { Set } from '@/components/Set'
import { useEffect, useState } from 'react'
import { getPlatesForWeight, getSets } from '@/lib/utils'
import { BAR_WEIGHT_OPTIONS, MAX_ALLOWED_WEIGHT } from '@/common/consts'

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

// Validation pattern borrowed from Robin Wieruch's blog post here:
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
        Number(value) < Number(formState.workWeight),
      message: 'Start weight must be less than work weight',
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
        Number(value) > Number(formState.startWeight),
      message: 'Work weight must be greater than start weight',
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
      <main className="backgroundPattern h-screen">
        <div className="w-full">
          <div className="flex justify-center py-10">
            <span className="text-5xl text-gray-700 font-bold">
              SETS&apos;N&apos;PLATES
            </span>
          </div>
          <div className="w-1/3 pl-5 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="barWeight"
            >
              Bar
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:bg-white focus:border-gray-500"
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
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="weightInputsContainer flex w-1/3">
            <div className="startWeightContainer px-5 mb-6 ">
              <label
                className="block uppercase tracking-wide font-bold text-xs text-gray-700 mb-2 whitespace-nowrap"
                htmlFor="startWeight"
              >
                Start Weight
              </label>
              <input
                className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="startWeight"
                name="startWeight"
                onChange={handleChange}
                value={formState.startWeight}
                type="text"
              />
              {dirty && errorFields.startWeight?.length ? (
                <p className="text-red-500 text-xs italic">
                  {errorFields.startWeight[0].message}{' '}
                </p>
              ) : null}
            </div>

            <div className="workWeightContainer px-5 mb-6 mx-auto">
              <label
                className="block uppercase tracking-wide font-bold text-xs text-gray-700 mb-2 whitespace-nowrap"
                htmlFor="workWeight"
              >
                Work Weight
              </label>
              <input
                className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="workWeight"
                name="workWeight"
                onChange={handleChange}
                value={formState.workWeight}
                type="text"
              />
              {dirty && errorFields.workWeight?.length ? (
                <p className="text-red-500 text-xs italic">
                  {errorFields.workWeight[0].message}{' '}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="px-5">
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
      </main>
    </>
  )
}
