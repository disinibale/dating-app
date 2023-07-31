import { Model, FindOptions, UpdateOptions, ModelStatic, Attributes, DestroyOptions, CreationAttributes, CreateOptions } from 'sequelize'

export default abstract class BaseService<M extends Model> {
    protected model: ModelStatic<M>

    constructor(model: ModelStatic<M>) {
        this.model = model
    }

    async create(data: CreationAttributes<M>, options?: CreateOptions): Promise<M> {
        return await this.model.create(data as CreationAttributes<M>, options)
    }

    async createBulk(data: Array<CreationAttributes<M>>, options?: CreateOptions): Promise<M[]> {
        return await this.model.bulkCreate(data, options)
    }

    async findById(id: number | undefined, options?: FindOptions): Promise<M | null> {
        return await this.model.findByPk(id, options)
    }

    async findOne(options?: FindOptions): Promise<M | null> {
        return await this.model.findOne(options)
    }

    async findAll(options?: FindOptions): Promise<M[]> {
        return await this.model.findAll(options)
    }

    async update(data: CreationAttributes<M>, options: UpdateOptions<Attributes<M>>): Promise<[affectedCount: number]> {
        return await this.model.update(data, options)
    }

    async delete(options?: DestroyOptions<M>): Promise<number> {
        return await this.model.destroy(options)
    }
}