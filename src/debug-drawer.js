import { box2d } from "./init-box2d.js";
import * as PIXI from "pixi.js";

const sizeOfB2Vec2 = Float32Array.BYTES_PER_ELEMENT * 2;

export default class DebugDrawer {
    constructor(stage, pixelsPerMeter, thickness = 3) {
        this.lines = new PIXI.Graphics();
        stage.addChild(this.lines);
        this.pixelsPerMeter = pixelsPerMeter;
        this.thickness = thickness;

        const {
            b2Color,
            b2Draw: { e_shapeBit },
            b2Vec2,
            JSDraw,
            wrapPointer
        } = box2d;

        const reifyArray = (array_p, numElements, sizeOfElement, ctor) =>
            Array(numElements)
            .fill(undefined)
            .map((_, index) =>
                wrapPointer(array_p + index * sizeOfElement, ctor)
            );

        self = this;
        const debugDrawer = Object.assign(new JSDraw(), {
            DrawSegment(vert1_p, vert2_p, color_p) {},
            DrawPolygon(vertices_p, vertexCount, color_p) {},
            DrawSolidPolygon(vertices_p, vertexCount, color_p) {
                const color = wrapPointer(color_p, b2Color);
                const vertices = reifyArray(vertices_p, vertexCount,
                    sizeOfB2Vec2, b2Vec2);
                self.drawLines(vertices, color);
            },
            DrawCircle(center_p, radius, color_p) {},
            DrawSolidCircle(center_p, radius, axis_p, color_p) {
                const center = wrapPointer(center_p, b2Vec2);
                const color = wrapPointer(color_p, b2Color);
                self.drawCircle(center.x * self.pixelsPerMeter,
                    center.y * self.pixelsPerMeter,
                    radius * self.pixelsPerMeter, color);
            },
            DrawTransform(transform_p) {},
            DrawPoint(vertex_p, sizeMetres, color_p) {}
        });
        debugDrawer.SetFlags(e_shapeBit);
        this.instance = debugDrawer;
    }

    drawLines(vertices, color) {
        const c = new PIXI.Color([color.r, color.g, color.b]).toHex();
        this.lines.lineStyle(this.thickness, c, 1, 0.5, false);
        this.lines.moveTo(vertices[0].x * this.pixelsPerMeter,
            vertices[0].y * this.pixelsPerMeter);
        this.lines.lineTo(vertices[1].x * this.pixelsPerMeter,
            vertices[1].y * this.pixelsPerMeter);
        this.lines.lineTo(vertices[2].x * this.pixelsPerMeter,
            vertices[2].y * this.pixelsPerMeter);
        this.lines.lineTo(vertices[3].x * this.pixelsPerMeter,
            vertices[3].y * this.pixelsPerMeter);
        this.lines.lineTo(vertices[0].x * this.pixelsPerMeter,
            vertices[0].y * this.pixelsPerMeter);
    }

    drawCircle(x0, y0, radius, color) {
        let angle = 0;
        const angleStep = 20;
        const n = 360 / angleStep;

        const c = new PIXI.Color([color.r, color.g, color.b]).toHex();
        this.lines.lineStyle(this.thickness, c, 1, 0.5, false);

        let x = radius * Math.cos(angle * Math.PI / 180);
        let y = radius * Math.sin(angle * Math.PI / 180);
        this.lines.moveTo(x0 + x, y0 + y);
        angle += angleStep;

        for (let i = 0; i < n; i++) {
            x = radius * Math.cos(angle * Math.PI / 180);
            y = radius * Math.sin(angle * Math.PI / 180);
            this.lines.lineTo(x0 + x, y0 + y);
            angle += angleStep;
        }
    }

    clear() {
        this.lines.clear();
    }
}
