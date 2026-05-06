import { faker } from "@faker-js/faker";
import fs from "fs";

type mediaUploadOptions = {
  mimeType?: string;
  mediaHeight?: number;
  mediaWidth?: number;
  mediaSizeInBytes?: number;
};

export class MediaFactory {
  static buildValidMediaPayload(
    files: string[],
    type: "post" | "chat" | "profile" | "story",
  ) {
    return {
      medias: files.map((filePath) => {
        const stats = fs.statSync(filePath);

        let height, width;
        if (type == "chat") {
          height = filePath.endsWith(".mp4") ? 720 : 1080;
          width = filePath.endsWith(".mp4") ? 1280 : 1920;
        } else if (type == "post") {
          height = filePath.endsWith(".mp4") ? 720 : 1080;
          width = filePath.endsWith(".mp4") ? 1280 : 1080;
        } else if (type == "profile") {
          height = 1080;
          width = 1080;
        } else if (type == "story") {
          height = filePath.endsWith(".mp4") ? 720 : 1080;
          width = filePath.endsWith(".mp4") ? 1280 : 1920;
        }

        return {
          mimeType: filePath.endsWith(".mp4") ? "video/mp4" : "image/webp",
          mediaHeight: height,
          mediaWidth: width,
          mediaSizeInBytes: stats.size,
        };
      }),
    };
  }

  static buildMediaPayload(
    files: string[],
    heights: number[],
    widths: number[],
  ) {
    if (!files || files.length === 0) {
      throw new Error("Files array cannot be empty");
    }
    if (files.length !== heights.length || files.length !== widths.length) {
      throw new Error("files, heighhts and widths length must match");
    }

    return {
      medias: files.map((filePath, index) => {
        if (!fs.existsSync(filePath)) {
          throw new Error(`File not found: ${filePath}`);
        }

        const stats = fs.statSync(filePath);
        return {
          mimeType: filePath.endsWith(".mp4") ? "video/mp4" : "image/webp",
          mediaHeight: heights[index],
          mediaWidth: widths[index],
          mediaSizeInBytes: stats.size,
        };
      }),
    };
  }

  static buildInitialMediaUploadPayload(options: mediaUploadOptions = {}) {
    const payload = {
      medias: [
        {
          mimeType:
            options.mimeType ??
            faker.helpers.arrayElement([
              "image/webp",
              "video/mp4",
            ]),
          mediaHeight:
            options.mediaHeight ?? faker.datatype.number({ min: 720, max: 2160 }),
          mediaWidth:
            options.mediaWidth ?? faker.datatype.number({ min: 720, max: 3840 }),
          mediaSizeInBytes:
            options.mediaSizeInBytes ??
            faker.datatype.number({ min: 100000, max: 8000000 }),
        },
      ],
    };

    return payload;
  }

}
