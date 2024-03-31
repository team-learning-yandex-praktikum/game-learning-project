import { GameObject } from '../GameObject'

function collides(
    left: number,
    top: number,
    right: number,
    bottom: number,
    left2: number,
    top2: number,
    right2: number,
    bottom2: number
) {
    return !(right <= left2 || left > right2 || bottom <= top2 || top > bottom2)
}

class PhysicsComponent {
    public checkCollisions<O extends GameObject = GameObject>(
        targetObj: GameObject,
        objects: O[],
        collisionFunc: (o: O) => void
    ) {
        for (const obj of objects) {
            if (this.boxCollides(targetObj, obj)) {
                collisionFunc(obj)
                break
            }
        }
    }

    private boxCollides(obj: GameObject, obj2: GameObject) {
        const left = obj.pos[0]
        const top = obj.pos[1]
        const left2 = obj2.pos[0]
        const top2 = obj2.pos[1]

        return collides(
            left,
            top,
            left + obj.width,
            top + obj.height,
            left2,
            top2,
            left2 + obj2.width,
            top2 + obj2.height
        )
    }
}

export { PhysicsComponent as Physics }
