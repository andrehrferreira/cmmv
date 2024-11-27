import { AbstractContract, Contract, ContractField } from '@cmmv/core';

@Contract({
    controllerName: 'Task',
    protoPath: 'src/protos/task.proto',
    protoPackage: 'task',
    imports: ['crypto'],
    cache: {
        key: 'task:',
        ttl: 300,
        compress: true,
    },
})
export class TasksContract extends AbstractContract {
    @ContractField({
        protoType: 'string',
        unique: true,
        validations: [
            {
                type: 'IsString',
                message: 'Invalid label',
            },
            {
                type: 'IsNotEmpty',
                message: 'Invalid label',
            },
        ],
    })
    label: string;

    @ContractField({
        protoType: 'bool',
        defaultValue: false,
        validations: [
            {
                type: 'IsBoolean',
                message: 'Invalid checked type',
            },
        ],
    })
    checked: boolean;

    @ContractField({
        protoType: 'bool',
        defaultValue: false,
        validations: [
            {
                type: 'IsBoolean',
                message: 'Invalid removed type',
            },
        ],
    })
    removed: boolean;

    @ContractField({ protoType: 'date' })
    createAt?: boolean;
}
